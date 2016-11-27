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

    LogDoSistemaDTO logDoSistemaToLogDoSistemaDTO(LogDoSistema logDoSistema);

    List<LogDoSistemaDTO> logDoSistemasToLogDoSistemaDTOs(List<LogDoSistema> logDoSistemas);

    LogDoSistema logDoSistemaDTOToLogDoSistema(LogDoSistemaDTO logDoSistemaDTO);

    List<LogDoSistema> logDoSistemaDTOsToLogDoSistemas(List<LogDoSistemaDTO> logDoSistemaDTOs);
}
