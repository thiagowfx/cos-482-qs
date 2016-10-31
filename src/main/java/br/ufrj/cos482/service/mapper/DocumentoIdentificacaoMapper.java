package br.ufrj.cos482.service.mapper;

import br.ufrj.cos482.domain.*;
import br.ufrj.cos482.service.dto.DocumentoIdentificacaoDTO;

import org.mapstruct.*;
import java.util.List;

/**
 * Mapper for the entity DocumentoIdentificacao and its DTO DocumentoIdentificacaoDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface DocumentoIdentificacaoMapper {

    DocumentoIdentificacaoDTO documentoIdentificacaoToDocumentoIdentificacaoDTO(DocumentoIdentificacao documentoIdentificacao);

    List<DocumentoIdentificacaoDTO> documentoIdentificacaosToDocumentoIdentificacaoDTOs(List<DocumentoIdentificacao> documentoIdentificacaos);

    DocumentoIdentificacao documentoIdentificacaoDTOToDocumentoIdentificacao(DocumentoIdentificacaoDTO documentoIdentificacaoDTO);

    List<DocumentoIdentificacao> documentoIdentificacaoDTOsToDocumentoIdentificacaos(List<DocumentoIdentificacaoDTO> documentoIdentificacaoDTOs);
}
