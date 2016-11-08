package br.ufrj.cos482.service.mapper;

import br.ufrj.cos482.domain.*;
import br.ufrj.cos482.service.dto.LogDoSistemaDTO;

import org.mapstruct.*;
import java.util.List;

/**
 * Mapper for the entity LogDoSistema and its DTO LogDoSistemaDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface LogDoSistemaMapper {

    @Mapping(source = "usuario.id", target = "usuarioId")
    LogDoSistemaDTO logDoSistemaToLogDoSistemaDTO(LogDoSistema logDoSistema);

    List<LogDoSistemaDTO> logDoSistemasToLogDoSistemaDTOs(List<LogDoSistema> logDoSistemas);

    @Mapping(source = "usuarioId", target = "usuario")
    LogDoSistema logDoSistemaDTOToLogDoSistema(LogDoSistemaDTO logDoSistemaDTO);

    List<LogDoSistema> logDoSistemaDTOsToLogDoSistemas(List<LogDoSistemaDTO> logDoSistemaDTOs);

    default Usuario usuarioFromId(Long id) {
        if (id == null) {
            return null;
        }
        Usuario usuario = new Usuario();
        usuario.setId(id);
        return usuario;
    }
}
