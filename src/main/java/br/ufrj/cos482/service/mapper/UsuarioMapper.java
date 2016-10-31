package br.ufrj.cos482.service.mapper;

import br.ufrj.cos482.domain.*;
import br.ufrj.cos482.service.dto.UsuarioDTO;

import org.mapstruct.*;
import java.util.List;

/**
 * Mapper for the entity Usuario and its DTO UsuarioDTO.
 */
@Mapper(componentModel = "spring", uses = {UserMapper.class, })
public interface UsuarioMapper {

    @Mapping(source = "cpf.id", target = "cpfId")
    @Mapping(source = "rg.id", target = "rgId")
    @Mapping(source = "tituloDeEleitor.id", target = "tituloDeEleitorId")
    @Mapping(source = "dispensaMilitar.id", target = "dispensaMilitarId")
    @Mapping(source = "passaporte.id", target = "passaporteId")
    @Mapping(source = "systemUser.id", target = "systemUserId")
    UsuarioDTO usuarioToUsuarioDTO(Usuario usuario);

    List<UsuarioDTO> usuariosToUsuarioDTOs(List<Usuario> usuarios);

    @Mapping(source = "cpfId", target = "cpf")
    @Mapping(source = "rgId", target = "rg")
    @Mapping(source = "tituloDeEleitorId", target = "tituloDeEleitor")
    @Mapping(source = "dispensaMilitarId", target = "dispensaMilitar")
    @Mapping(source = "passaporteId", target = "passaporte")
    @Mapping(source = "systemUserId", target = "systemUser")
    Usuario usuarioDTOToUsuario(UsuarioDTO usuarioDTO);

    List<Usuario> usuarioDTOsToUsuarios(List<UsuarioDTO> usuarioDTOs);

    default DocumentoIdentificacao documentoIdentificacaoFromId(Long id) {
        if (id == null) {
            return null;
        }
        DocumentoIdentificacao documentoIdentificacao = new DocumentoIdentificacao();
        documentoIdentificacao.setId(id);
        return documentoIdentificacao;
    }
}
